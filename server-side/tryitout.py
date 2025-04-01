# second most effiecient
# import cv2
# import numpy as np

# # Load the pre-trained Haar Cascade face detector
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# # Open the camera (change the argument to 0 for the default camera)
# cap = cv2.VideoCapture(0)

# # List to store face locations and IDs
# known_faces = []

# # Distance threshold for considering a face as the same person
# distance_threshold = 100

# # Variable to assign unique ID to each person
# current_id = 1

# def calculate_distance(x1, y1, x2, y2):
#     return np.sqrt((x1 - x2)**2 + (y1 - y2)**2)

# while True:
#     # Read a frame from the camera
#     ret, frame = cap.read()

#     # Check if the frame was successfully read
#     if not ret:
#         print("Failed to capture frame. Exiting...")
#         break

#     # Convert the frame to grayscale for face detection
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Detect faces in the frame
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

#     # Process each detected face
#     for (x, y, w, h) in faces:
#         # Calculate the center of the face
#         face_center = (x + w // 2, y + h // 2)

#         # Check if the face is near any known face
#         match_id = None
#         for face_info in known_faces:
#             face_id, (known_x, known_y, _, _) = face_info
#             distance = calculate_distance(face_center[0], face_center[1], known_x, known_y)
#             if distance < distance_threshold:
#                 match_id = face_id
#                 break

#         # If it's a new face, assign a unique ID
#         if match_id is None:
#             known_faces.append((current_id, (face_center[0], face_center[1], w, h)))
#             print(f"New face detected! Assigned ID: {current_id}")
#             current_id += 1
#         else:
#             # If the face is already known, print a message
#             print(f"This person is repeated! ID: {match_id}")

#         # Display the face ID
#         cv2.putText(frame, f"ID: {match_id}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#     # Display the frame
#     cv2.imshow('Camera', frame)

#     # Break the loop when 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the camera and close all windows
# cap.release()
# cv2.destroyAllWindows()







##Most efficient
# import cv2
# from mtcnn.mtcnn import MTCNN
# import numpy as np

# cap = cv2.VideoCapture(0)
# detector = MTCNN()

# known_faces = []
# distance_threshold = 100
# current_id = 1

# def calculate_distance(x1, y1, x2, y2):
#     return np.sqrt((x1 - x2)**2 + (y1 - y2)**2)

# while True:
#     ret, frame = cap.read()

#     if not ret:
#         print("Failed to capture frame. Exiting...")
#         break

#     faces = detector.detect_faces(frame)

#     for face in faces:
#         x, y, w, h = face['box']
#         face_center = (x + w // 2, y + h // 2)

#         match_id = None
#         for face_info in known_faces:
#             face_id, (known_x, known_y, _, _) = face_info
#             distance = calculate_distance(face_center[0], face_center[1], known_x, known_y)
#             if distance < distance_threshold:
#                 match_id = face_id
#                 break

#         if match_id is None:
#             known_faces.append((current_id, (face_center[0], face_center[1], w, h)))
#             print(f"New face detected! Assigned ID: {current_id}")
#             current_id += 1
#         else:
#             print(f"This person is repeated! ID: {match_id}")

#         cv2.putText(frame, f"ID: {match_id}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#     cv2.imshow('Camera', frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()






# import cv2
# import numpy as np  # Add this line for NumPy

# # Load the pre-trained Haar Cascade face detector
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# # Open the camera (change the argument to 0 for the default camera)
# cap = cv2.VideoCapture(0)

# # List to store face locations and IDs
# known_faces = []

# # Distance threshold for considering a face as the same person
# distance_threshold = 100

# # Variable to assign a unique ID to each person
# current_id = 1

# def calculate_distance(x1, y1, x2, y2):
#     return np.sqrt((x1 - x2)**2 + (y1 - y2)**2)

# while True:
#     # Read a frame from the camera
#     ret, frame = cap.read()

#     # Check if the frame was successfully read
#     if not ret:
#         print("Failed to capture frame. Exiting...")
#         break

#     # Convert the frame to grayscale for face detection
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Detect faces in the frame
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

#     # Process each detected face
#     for (x, y, w, h) in faces:
#         # Calculate the center of the face
#         face_center = (x + w // 2, y + h // 2)

#         # Check if the face is near any known face
#         match_id = None
#         for face_info in known_faces:
#             face_id, (known_x, known_y, _, _) = face_info
#             distance = calculate_distance(face_center[0], face_center[1], known_x, known_y)
#             if distance < distance_threshold:
#                 match_id = face_id
#                 break

#         # If it's a new face, assign a unique ID
#         if match_id is None:
#             known_faces.append((current_id, (face_center[0], face_center[1], w, h)))
#             print(f"New face detected! Assigned ID: {current_id}")
#             current_id += 1
#         else:
#             # If the face is already known, print a message
#             print(f"This person is repeated! ID: {match_id}")

#         # Display the face ID
#         cv2.putText(frame, f"ID: {match_id}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#     # Display the frame
#     cv2.imshow('Camera', frame)

#     # Break the loop when 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the camera and close all windows
# cap.release()
# cv2.destroyAllWindows()




# import cv2
# import numpy as np  # Add this line for NumPy
# import requests
# import json


# def get_current_video_info():
#     # Send a GET request to the server to get information about the current video
#     url = "http://localhost:4000/current-video-info"
#     response = requests.get(url)

#     if response.status_code == 200:
#         current_video_info = response.json()
#         return current_video_info
#     else:
#         print("Failed to get current video info.")
#         return None
    
    
# def calculate_distance(x1, y1, x2, y2):
#     return np.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    
# def count_people():

# # Load the pre-trained Haar Cascade face detector
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     prev_video = None
#     global current_video
#     # Open the camera (change the argument to 0 for the default camera)
#     cap = cv2.VideoCapture(0)

#     # List to store face locations and IDs
#     known_faces = []  # Add this line

#     # Set to store unique face IDs
#     # unique_ids = set()
#     unique_ids = []

#     # Distance threshold for considering a face as the same person
#     distance_threshold = 200

#     # Variable to assign a unique ID to each person
#     current_id = 1



#     while True:
#         # Read a frame from the camera
#         ret, frame = cap.read()
        
#         current_video_info = get_current_video_info()
#         if current_video_info:
#             current_video = current_video_info.get('currentVideo')


#         # Check if the frame was successfully read
#         if not ret:
#             print("Failed to capture frame. Exiting...")
#             break

#         # Convert the frame to grayscale for face detection
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#         # Detect faces in the frame
#         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

#         # Process each detected face
#         for (x, y, w, h) in faces:
#             # Calculate the center of the face
#             face_center = (x + w // 2, y + h // 2)

#             # Check if the face is near any known face
#             match_id = None
#             for face_info in known_faces:
#                 face_id, (known_x, known_y, _, _) = face_info
#                 distance = calculate_distance(face_center[0], face_center[1], known_x, known_y)
#                 if distance < distance_threshold:
#                     match_id = face_id
#                     break

#             # If it's a new face, assign a unique ID
#             if match_id is None:
#                 known_faces.append((current_id, (face_center[0], face_center[1], w, h)))
#                 print(f"New face detected! Assigned ID: {current_id}")
#                 videoWithViewerId = {
#                     "id": current_id,
#                     "video_name": [current_video]
#                 }
#                 unique_ids.append(videoWithViewerId)
#                 print(f"Total number of unique IDs: {len(unique_ids)}")
#                 with open("videoDataSummary.json", "w") as json_file:
#                     json.dump(unique_ids, json_file, indent=2)

#                 if prev_video != current_video:
#                     print(f"person with id {current_id} is watching {current_video}")
#                     prev_video = current_video
#                     print(f"Now we have: {unique_ids}")
#                 current_id += 1
#             else:
#                 if prev_video != current_video:
#                     print(f"person with id {match_id} already exist and now it is watching {current_video}")
#                     prev_video = current_video
#                     for id in unique_ids:
#                         if match_id == id['id']:
#                             if current_video not in id['video_name']:
#                                 id['video_name'].append(current_video)
#                             with open("videoDataSummary.json", "w") as json_file:
#                                 json.dump(unique_ids, json_file, indent=2)

#                     print(f"Now we have: {unique_ids}")
#                     # print(f"Known faces are: {known_faces}")

#                 # If the face is already known, print a message
#                 # print(f"This person is repeated! ID: {match_id}")
#                 pass

#             # Display the face ID
#             cv2.putText(frame, f"ID: {match_id}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#         # Display the frame
#         cv2.imshow('Camera', frame)

#         # Break the loop when 'q' is pressed
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     # Release the camera and close all windows
#     cap.release()
#     cv2.destroyAllWindows()

# # Print the total count of unique IDs

# # if __name__ == "__main__":
# count_people()
