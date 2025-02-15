import json
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SustainabilityAction


class ActionList(APIView):
    def get(self, request):
        # Step 1: Retrieve data from the database
        actions = SustainabilityAction.objects.all()

        if not actions.exists():  # If the database is empty
            try:
                with open("backup.json", "r") as file:
                    data = json.load(file)  # Load from JSON file

                # Restore data into the database
                for item in data:
                    SustainabilityAction.objects.create(
                        action=item["action"],
                        date=item["date"],
                        points=item["points"]
                    )

                # Reload from the database
                actions = SustainabilityAction.objects.all()
                return Response({"message": "Database was empty, restored from JSON file", "data": list(actions.values())})

            except FileNotFoundError:
                # No backup file found
                return Response({"message": "Database is empty and no backup file found", "data": []})

        # Step 2: Return data from the database
        return Response({"message": "Success", "data": list(actions.values())})

    def post(self, request):
        try:
            # Get data from the request
            action = request.data.get("action")
            date = request.data.get("date")
            points = request.data.get("points")

            # Save to the database
            new_action = SustainabilityAction.objects.create(
                action=action, date=date, points=points)

            # Update JSON backup
            actions = list(SustainabilityAction.objects.values())
            with open("backup.json", "w") as file:
                json.dump(actions, file, default = str)

            return Response({"message": "Action added successfully", "data": {"id": new_action.id}}, status=201)
        except Exception as e:
            return Response({"message": "Error adding action", "error": str(e)}, status=400)


class ActionDetail(APIView):
    def put(self, request, id):
        try:
            # Find the action in the database
            action = SustainabilityAction.objects.get(id=id)

            # Update fields
            action.action = request.data.get("action", action.action)
            action.date = request.data.get("date", action.date)
            action.points = request.data.get("points", action.points)
            action.save()

            # Update JSON backup
            actions = list(SustainabilityAction.objects.values())
            with open("backup.json", "w") as file:
                json.dump(actions, file, default = str)

            return Response({"message": "Action updated successfully", "data": {"id": action.id}})
        except ObjectDoesNotExist:
            return Response({"message": "Action not found"}, status=404)
        except Exception as e:
            return Response({"message": "Error updating action", "error": str(e)}, status=400)
        
    def delete(self, request, id):
        try:
            # Find and delete the action
            action = SustainabilityAction.objects.get(id=id)
            action.delete()

            # Update JSON backup
            actions = list(SustainabilityAction.objects.values())
            with open("backup.json", "w") as file:
                json.dump(actions, file, default = str)

            return Response({"message": "Action deleted successfully"})
        except ObjectDoesNotExist:
            return Response({"message": "Action not found"}, status=404)
        except Exception as e:
            return Response({"message": "Error deleting action", "error": str(e)}, status=400)