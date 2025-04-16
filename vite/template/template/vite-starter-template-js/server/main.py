from fastapi import FastAPI
print('1')
from routes.auth import auth_router
print("1")
from routes.two_factor_auth import two_factor_auth_router
print("2")

from routes.forgot_password import forgot_password_router
# from routes.amount_deposit import amount_deposit_router
print("1")

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend origin for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,prefix='/auth')
app.include_router(two_factor_auth_router,prefix='/two_factor')
app.include_router(forgot_password_router,prefix='/auth')
# app.include_router(amount_deposit_router,prefix='/amount')

@app.get('/')
def server():
    return {"Server":"Running"}
























# from fastapi import APIRouter

# from pydantic import BaseModel


# from config.config import get_mongo_db_user

# amount_deposit_router = APIRouter()

# collection = get_mongo_db_user()

# class AmountDeposit(BaseModel):
#     amount:str
#     user_id:str




# @amount_deposit_router.post('/deposit')
# async def amount_deposit(request: AmountDeposit):
#     print(request)
#     amount = int(request.amount)

#     try:
#         # 1. Get user from the database
#         user_db = collection.find_one({"user_id": request.user_id})
#         if not user_db:
#             return {"error": "User not found"}
        
#         user_id = str(user_db["_id"])
#         sponsor_id = user_db.get("sponsor_id", "0")  # Get sponsor ID
#         print(sponsor_id,"sponsor_id")
#         total_sponsored_amount = 0  # Track total bonuses
#         bonus_amount = amount // 2  # 50% bonus distribution

#         if sponsor_id != "0":  # Check if user has a sponsor
#             # 2. Find the direct sponsor
#             sponsor = collection.find_one({"_id": ObjectId(sponsor_id)})
#             if sponsor:
#                 sponsor_amount = int(sponsor.get("amount", 0))

#                 # Update sponsor balance
#                 collection.update_one(
#                     {"_id": sponsor["_id"]},
#                     {"$set": {"amount": sponsor_amount + bonus_amount}}
#                 )
#                 total_sponsored_amount += bonus_amount

#                 # 3. Check if the sponsor has their own sponsor (second-level bonus)
#                 second_sponsor_id = sponsor.get("sponsor_id", "0")
#                 if second_sponsor_id != "0":
#                     second_sponsor = collection.find_one({"_id": ObjectId(second_sponsor_id)})
#                     if second_sponsor:
#                         second_sponsor_amount = int(second_sponsor.get("amount", 0))

#                         # Update second-level sponsor's balance
#                         collection.update_one(
#                             {"_id": second_sponsor["_id"]},
#                             {"$set": {"amount": second_sponsor_amount + bonus_amount}}
#                         )
#                         total_sponsored_amount += bonus_amount

#         # 4. Update user's balance with the deposit amount
#         previous_amount = int(user_db.get("amount", 0))
#         new_amount = previous_amount + amount  

#         collection.update_one(
#             {"user_id": request.user_id}, 
#             {"$set": {"amount": new_amount}}
#         )

#         return {
#             "message": "Deposit successful",
#             "status": "success",
#             "new_amount": new_amount,
#             "total_sponsor_bonus": total_sponsored_amount
#         }
    
#     except Exception as e:
#         print("e",e)
#         return {"error": str(e)}
