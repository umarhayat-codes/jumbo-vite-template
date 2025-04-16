from fastapi import APIRouter

from pydantic import BaseModel

from config.config import get_mongo_db_user

amount_deposit_router = APIRouter()

collection = get_mongo_db_user()

class AmountDeposit(BaseModel):
    amount:str
    user_id:str


# @amount_deposit_router.post('/deposit')
# async def amount_deposit(request: AmountDeposit):
#     print(request)
#     amount = int(request.amount)

#     try:
#         user_db = collection.find_one({"user_id": request.user_id})
#         id = str(user_db['_id'])
#         sponsor_users = collection.find_one({"sponsor_id": id})
#         total_sponsored_amount = int(user_db['amount'])
        
#         for user in sponsor_users:
#             total_sponsored_amount += user.get("amount", 0)
        
#         if user_db:
#             previous_amount = user_db.get("amount", 0)  # Get previous amount, default to 0 if not found
#             new_amount = previous_amount + amount  # Add the new deposit
#             collection.update_one(
#                 {"user_id": request.user_id}, 
#                 {"$set": {"amount": new_amount}}
#             )
#         else:
#             # If user does not exist, create a new record
#             collection.insert_one({
#                 "user_id": request.user_id,
#                 "amount": amount
#             })

#         return {"message": "Deposit successful","status":"success", "new_amount": new_amount}
    
#     except Exception as e:
#         return {"error": str(e)}


# @amount_deposit_router.post('/deposit')
# async def amount_deposit(request: AmountDeposit):
#     print(request)
#     amount = int(request.amount)

#     try:
#         # 1. Get user from database
#         user_db = collection.find_one({"user_id": request.user_id})
#         if not user_db:
#             return {"error": "User not found"}

#         user_id = str(user_db["_id"])
#         total_sponsored_amount = 0  # To accumulate sponsor bonuses

#         # 2. Traverse sponsor chain up to 3 levels
#         for i in range(3): 
#             print(f'user_id: {user_id}') 
#             sponsor = collection.find_one({"sponsor_id": user_id})  # Find the sponsor user
            
#             print(f"sponsor user {i}:{sponsor} ")
#             if not sponsor:
#                 print(f"Sponsor Not Fount:{i}")
#                 break  # No more sponsors in the chain
            
#             sponsor_id = str(sponsor["_id"])
#             sponsor_amount = int(sponsor.get("amount", 0))

            
#             sponsor_bonus = amount // 2
#             print(f"sponsor_bonus {i}:{sponsor_bonus}")

#             total_sponsored_amount += sponsor_bonus

#             # 4. Update sponsor's balance
#             collection.update_one(
#                 {"_id": sponsor["_id"]}, 
#                 {"$set": {"amount": sponsor_amount + sponsor_bonus}}
#             )

#             # Move to next sponsor level
#             user_id = sponsor_id

#         # 5. Update user's balance with the new deposit
#         previous_amount = user_db.get("amount", 0)
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
#         return {"error": str(e)}





# @amount_deposit_router.post('/deposit')
# async def amount_deposit(request: AmountDeposit):
#     print(request)
#     amount = int(request.amount)

#     try:
#         # 1. Get user from database
#         user_db = collection.find_one({"user_id": request.user_id})
#         if not user_db:
#             return {"error": "User not found"}

#         user_id = str(user_db["_id"])
#         total_sponsored_amount = 0  # To accumulate sponsor bonuses
#         bonus_amount = amount // 2  # Bonus amount for each sponsor

#         # 2. Get all sponsors for the user
#         sponsors = list(collection.find({"sponsor_id": user_id}))  # Find all direct sponsors

#         if len(sponsors) > 1:
#             # If multiple sponsors, distribute bonus_amount to all
#             for sponsor in sponsors:
#                 sponsor_id = str(sponsor["_id"])
#                 sponsor_amount = int(sponsor.get("amount", 0))
#                 # Update sponsor's balance
#                 collection.update_one(
#                     {"_id": sponsor["_id"]},
#                     {"$set": {"amount": sponsor_amount + bonus_amount}}
#                 )
#                 total_sponsored_amount += bonus_amount



        # elif len(sponsors) == 1:
        #     # If only one sponsor, give it the bonus_amount and check its sponsor
        #     sponsor = sponsors[0]
        #     sponsor_id = str(sponsor["_id"])
        #     sponsor_amount = int(sponsor.get("amount", 0))

        #     # Update sponsor's balance
        #     collection.update_one(
        #         {"_id": sponsor["_id"]},
        #         {"$set": {"amount": sponsor_amount + bonus_amount}}
        #     )
        #     total_sponsored_amount += bonus_amount

        #     # Find the next-level sponsor
        #     next_sponsor = collection.find_one({"sponsor_id": sponsor_id})
        #     if next_sponsor:
        #         next_sponsor_id = str(next_sponsor["_id"])
        #         next_sponsor_amount = int(next_sponsor.get("amount", 0))

        #         # Update next-level sponsor's balance
        #         collection.update_one(
        #             {"_id": next_sponsor["_id"]},
        #             {"$set": {"amount": next_sponsor_amount + bonus_amount}}
        #         )
        #         total_sponsored_amount += bonus_amount

        # 5. Update user's balance with the new deposit
    #     previous_amount = user_db.get("amount", 0)
    #     new_amount = previous_amount + amount  

    #     collection.update_one(
    #         {"user_id": request.user_id}, 
    #         {"$set": {"amount": new_amount}}
    #     )

    #     return {
    #         "message": "Deposit successful",
    #         "status": "success",
    #         "new_amount": new_amount,
    #         "total_sponsor_bonus": total_sponsored_amount
    #     }
    
    # except Exception as e:
    #     return {"error": str(e)}











@amount_deposit_router.post('/deposit')
async def amount_deposit(request: AmountDeposit):
    print(request)
    amount = int(request.amount)

    try:
        # 1. Get user from database
        user_db = collection.find_one({"user_id": request.user_id})
        if not user_db:
            return {"error": "User not found"}

        user_id = str(user_db["_id"])
        total_sponsored_amount = 0  # To accumulate sponsor bonuses
        bonus_amount = amount // 2  # Bonus amount for each sponsor


        sponsors = list(collection.find({"sponsor_id": user_id}))  # Find all direct sponsors

        for sponsor in sponsors:
            sponsor_id = str(sponsor["_id"])
            sponsor_amount = int(sponsor.get("amount", 0))

            # Update sponsor's balance
            collection.update_one(
                {"_id": sponsor["_id"]},
                {"$set": {"amount": sponsor_amount + bonus_amount}}
            )
            total_sponsored_amount += bonus_amount

            # 3. Check if the sponsor has their own sponsors
            sponsor_of_sponsors = list(collection.find({"sponsor_id": sponsor_id}))  # Get all next-level sponsors

            if sponsor_of_sponsors:  # If there are second-level sponsors
                for sponsor_of_sponsor in sponsor_of_sponsors:
                    second_sponsor_id = str(sponsor_of_sponsor["_id"])
                    second_sponsor_amount = int(sponsor_of_sponsor.get("amount", 0))

                    # Update second-level sponsor's balance
                    collection.update_one(
                        {"_id": sponsor_of_sponsor["_id"]},
                        {"$set": {"amount": second_sponsor_amount + bonus_amount}}
                    )
                    total_sponsored_amount += bonus_amount


        # 5. Update user's balance with the new deposit
        previous_amount = user_db.get("amount", 0)
        new_amount = previous_amount + amount  

        collection.update_one(
            {"user_id": request.user_id}, 
            {"$set": {"amount": new_amount}}
        )

        return {
            "message": "Deposit successful",
            "status": "success",
            "new_amount": new_amount,
            "total_sponsor_bonus": total_sponsored_amount
        }
    
    except Exception as e:
        return {"error": str(e)}











