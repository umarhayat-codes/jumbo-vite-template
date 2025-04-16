
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from config.config import get_mongo_db_user

import pyotp
# import qrcode
from io import BytesIO
import base64

SECRET_KEY = "secret-key"
ALGORITHM = "HS256"

collection = get_mongo_db_user()
if collection is not None:
    print("Mongo Successfully Connected in auth:")
else:
    print("Mongo is not Connected")





class Verify2FA(BaseModel):
    email: str
    token: str




two_factor_auth_router = APIRouter()

class Request(BaseModel):
    userId: str  # Expect user ID

@two_factor_auth_router.post('/enable')
async def enable_2fa(request:Request):
    # Fetch the user from the database

    print(request.userId)
    user = collection.find_one({"user_id": request.userId})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    print(user)
    # Generate 2FA Secret
    totp = pyotp.TOTP(pyotp.random_base32())
    secret = totp.secret

    # Generate OTP URI
    otp_auth_uri = totp.provisioning_uri(name=user['email'], issuer_name="YourAppName")

    # Generate QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(otp_auth_uri)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Convert QR Code to base64
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    collection.update_one(
        {"user_id": request.userId},
        {"$set": {
            "is_2fa_enabled": True,
            "otp_secret": secret,
            "enable": True
        }}
    )
    return {
        "status": 'success',
        # "user_id": user.id,
        "qr_code": qr_base64,
        "secret": secret
    }

@two_factor_auth_router.post("/dis-enable")
async def Disable_2FA_Request(request: Request):
    # Assuming request.userId contains the user's ID
    user_id = request.userId

    # Find the user in the database
    user = collection.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the user's record to disable 2FA
    update_result = collection.update_one(
        {"user_id": user_id},
        {"$set": {"enable":False,"is_2fa_enabled": False, "otp_secret": None}}
    )

    # Check if the update was successful
    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to disable 2FA")

    return {"message": "2FA has been disabled successfully","status":"success"}



# Request model for 2FA verification
class Verify2FARequest(BaseModel):
    email: str  # ID of the user
    code: str  # 2FA Code entered by the user

@two_factor_auth_router.post("/verify-2fa")
async def verify_2fa(request: Verify2FARequest):
    print(request)
    try:
        
        # Find user by user_id
        user = collection.find_one({"email": request.email})
        if not user:
            return {"message":"User Not Found"}
            # raise HTTPException(status_code=404, detail="User not found")

        # Check if 2FA is enabled for this user
        if not user.get("is_2fa_enabled", False):
            return {"message":"2FA is not enabled for this user"}
            # raise HTTPException(status_code=400, detail="2FA is not enabled for this user")

        # Get the stored secret key
        secret = user.get("otp_secret")
        if not secret:
            raise HTTPException(status_code=400, detail="No secret key found for this user")

        # Verify the OTP code using pyotp
        totp = pyotp.TOTP(secret)
        print(totp)
        if totp.verify(request.code):
            
            return {"success": True, "message": "2FA verification successful"}
        else:
            # print("error")
            return {"message":"Invalid 2FA code"}
            # raise HTTPException(status_code=400, detail="Invalid 2FA code")
    except Exception as e:
        print("e",e)   
        return {
            "error":str(e),
            "message":"Error in Verify 2FA"
        }