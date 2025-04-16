# from fastapi import APIRouter, HTTPException, Depends
# from pydantic import BaseModel
# from passlib.context import CryptContext
# from typing import Optional
# from fastapi.security import OAuth2PasswordBearer
# from config.config import get_mongo_db_user

# import jwt
# import datetime
# import random
# import string

# SECRET_KEY = "secret-key"
# ALGORITHM = "HS256"

# auth_router = APIRouter()

# collection = get_mongo_db_user()
# if collection is not None:
#     print("Mongo Successfully Connected in auth:")
# else:
#     print("Mongo is not Connected")

# pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# def get_random_id():
#     return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

# class RegisterUser(BaseModel):
#     firstName: Optional[str] = None
#     email: str
#     password: str

# class LoginUser(BaseModel):
#     email: str
#     password: str

# def get_hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_pwd: str, hash_pwd: str) -> bool:
#     return pwd_context.verify(plain_pwd, hash_pwd)

# def create_jwt_token(user_id: str):
#     payload = {
#         "user_id": user_id,
#         "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
#     }
#     return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# def decode_jwt_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=401, detail="Token expired")
#     except jwt.InvalidTokenError:
#         raise HTTPException(status_code=401, detail="Invalid token")

# async def verify_token(token: str = Depends(oauth2_scheme)):
#     payload = decode_jwt_token(token)
#     print(payload)
#     return payload["user_id"]

# @auth_router.post("/register")
# async def register(user: RegisterUser):
#     try:
#         if collection.find_one({"email": user.email}):
#             raise HTTPException(status_code=400, detail="User already exists")

#         hashed_password = get_hash_password(user.password)
#         user_data = {
#             "firstName": user.firstName,
#             "email": user.email,
#             "password": hashed_password,
#             "user_id": get_random_id()
#         }
#         collection.insert_one(user_data)

#         return {"message": "User registered successfully", "user_id": user_data["user_id"]}
#     except Exception as e:
#         return {"message": "Something went wrong", "error": str(e)}

# @auth_router.post("/login")
# async def login(user: LoginUser):
#     try:
#         db_user = collection.find_one({"email": user.email})
#         if not db_user or not verify_password(user.password, db_user["password"]):
#             raise HTTPException(status_code=400, detail="Invalid email or password")

#         token = create_jwt_token(db_user["user_id"])
#         return {"message": "User logged in successfully", "token": token}
#     except Exception as e:
#         return {"message": "Something went wrong while login", "error": str(e)}

# @auth_router.get("/user")
# async def get_user(user_id: str = Depends(verify_token)):
#     try:
#         user = collection.find_one({"user_id": user_id}, {"_id": 0, "password": 0})
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")
#         return {"status": "success", "user": user}
#     except Exception as e:
#         return {"message": "Something went wrong", "error": str(e)}




from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from config.config import get_mongo_db_user
import jwt
import datetime
import pyotp
import qrcode
import io
import base64

# Secret Key & Algorithm
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# MongoDB Connection
collection = get_mongo_db_user()
if collection is not None:
    print("Mongo Successfully Connected in auth:")
else:
    print("Mongo is not Connected")

# Password Hashing
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

# OAuth2 Token Authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Pydantic Models
class RegisterUser(BaseModel):
    firstName: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

class Verify2FA(BaseModel):
    email: str
    token: str

# Utility Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_pwd: str, hash_pwd: str) -> bool:
    return pwd_context.verify(plain_pwd, hash_pwd)

def create_jwt_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# FastAPI Router
auth_router = APIRouter()

@auth_router.post("/register")
async def register(user: RegisterUser):
    if collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)
    
    # Generate 2FA secret
    totp = pyotp.TOTP(pyotp.random_base32())
    secret = totp.secret
    
    # Generate QR Code
    otp_url = totp.provisioning_uri(name=user.email, issuer_name="MyApp")
    qr = qrcode.make(otp_url)
    buffered = io.BytesIO()
    qr.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode()

    user_data = {
        "firstName": user.firstName,
        "email": user.email,
        "password": hashed_password,
        "secret": secret,
        "isVerified": False
    }
    collection.insert_one(user_data)

    return {
        "message": "User registered successfully",
        "qrCode": qr_base64,  # QR Code in Base64 format
        "secret": secret  # This can be removed in production
    }

@auth_router.post("/login")
async def login(user: LoginUser):
    db_user = collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not db_user["isVerified"]:
        return {"message": "Please enter your 2FA code"}

    token = create_jwt_token(db_user["_id"])
    return {"message": "Login successful", "token": token}

@auth_router.post("/verify-2fa")
async def verify_2fa(user: Verify2FA):
    db_user = collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    totp = pyotp.TOTP(db_user["secret"])
    if totp.verify(user.token):
        collection.update_one({"email": user.email}, {"$set": {"isVerified": True}})
        token = create_jwt_token(db_user["_id"])
        return {"message": "2FA Verified", "token": token}
    else:
        raise HTTPException(status_code=400, detail="Invalid 2FA code")

@auth_router.get("/user")
async def get_user(user_id: str = Depends(lambda token: decode_jwt_token(token)["user_id"])):
    user = collection.find_one({"_id": user_id}, {"_id": 0, "password": 0, "secret": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "success", "user": user}
