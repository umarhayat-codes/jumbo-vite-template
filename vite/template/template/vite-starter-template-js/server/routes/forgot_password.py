from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr

from passlib.context import CryptContext

import random
import string

from config.config import get_mongo_db_user
# FastAPI instance

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

forgot_password_router = APIRouter()

collection = get_mongo_db_user()

# Request models
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyCodeRequest(BaseModel):
    otp: str
    id:str

class ResetPasswordRequest(BaseModel):
    id: str
    new_password: str


class UpdatePasswordRequest(BaseModel):
    id: str
    old_password : str
    new_password: str



class EmailChangeRequest(BaseModel):
    old_email:str
    new_email:str
    confirm_email:str

class VerifyEmailCodeRequest(BaseModel):
    user_id:str
    otp:str
    new_email:str


# Function to generate random code
def generate_code(length=6):
    return "".join(random.choices(string.digits, k=length))

@forgot_password_router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    email = request.email
    try:
        print("email", email)
        user = collection.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="Email not found")

        reset_code = generate_code()
        collection.update_one({"email": request.email}, {"$set": {"reset_code": reset_code}})
    
        return {"message": "Reset code generated", "code": reset_code,"user_id":user["user_id"]}  # In real case, send via email
    except Exception as e:
        return {
            "error":str(e),
            "message":"error",
            "data":[]
        }
@forgot_password_router.post("/verify-code")
async def verify_code(request: VerifyCodeRequest):
    print(request)
    user = collection.find_one({"user_id": request.id})
    if not user or user.get("reset_code") != request.otp:
        raise HTTPException(status_code=400, detail="Invalid code")
    
    return {"message": "Code verified, you can change your password"}

@forgot_password_router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    print(request)
    user = collection.find_one({"user_id": request.id})
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    hash_password = pwd_context.hash(request.new_password)
    print(hash_password)
    collection.update_one({"user_id": request.id}, {"$set": {"password": hash_password}, "$unset": {"reset_code": ""}})
    
    return {"message": "Password reset successfully"}


def verify_password(plain_pwd: str, hash_pwd: str) -> bool:
    print(pwd_context.verify(plain_pwd, hash_pwd))
    return pwd_context.verify(plain_pwd, hash_pwd)





# Change Password

@forgot_password_router.post("/change-password")
async def reset_password(request: UpdatePasswordRequest):
    try:
        print(request)
        user = collection.find_one({"user_id": request.id})
        print(user)
        if not user:
            return {"message":"User Not Found"}
            # raise HTTPException(status_code=404, detail="User not found")
        print(user['password'])
        if not verify_password(request.old_password, user["password"]):
            return {"message":"Incorrect old password"}
            # raise HTTPException(status_code=400, detail="Incorrect old password")

        hashed_password = pwd_context.hash(request.new_password)


        collection.update_one({"user_id": request.id}, {"$set": {"password": hashed_password}})

        return {"message": "Password changed successfully","status":"success"}
    except Exception as e:
        print("error",str(e))
        return {"message":str(e),"status":"error","error":"Error in Change Password"}
    







@forgot_password_router.post("/change-email")
async def change_email(request: EmailChangeRequest):
    print(request)
    try:
        user = collection.find_one({"email": request.old_email})
        if not user:
            print("User Not Fount")
            # HTTPException(status_code=404, detail="Old email not found")
            return {"message":"User Not Found"}
            

        if request.new_email != request.confirm_email:
            print("New email does not match confirmation email")
            return {"message":"New email does not match confirmation email"}
            # raise HTTPException(status_code=400, detail="New email does not match confirmation email")
        reset_code = generate_code()
        print(reset_code)
        collection.update_one({"email": request.old_email}, {"$set": {"email_reset_code": reset_code}})

        # Ideally, send an email with the reset code here
        return {"message": "Reset code generated","status":"success", "code": reset_code}
    
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "data": []
        }

# Endpoint to verify the reset code and update email
@forgot_password_router.post("/verify-email-code")
async def verify_email_code(request: VerifyEmailCodeRequest):
    try:
        user = collection.find_one({"user_id": request.user_id})
        if not user:
            return {"message":"User Not Found"}
            # raise HTTPException(status_code=404, detail="User not found")
        if user.get("email_reset_code") != request.otp:
            return {"message":"Incorrect OPT Code"}
            # raise HTTPException(status_code=400, detail="Invalid or expired code")
        # Update the email and remove the reset code
        collection.update_one({"user_id": request.user_id}, {
            "$set": {"email": request.new_email},
            "$unset": {"email_reset_code": ""}
        })

        return {"message": "Email changed successfully","status":"success"}
    
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "data": []
        }