from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sys



questions = [
    "hi yo ",
    "What items do you have available in your store?",
    "What are your store hours? open time ? active ours",
    "Do you offer sports apparel?",
    "What options do you have for men's clothing?",
    "Can you tell me about your women's clothing selection?",
    "Do you sell jewelry and accessories?",
    "Is online payment available on your website?",
    "ok thanks bye I am good nice fine",
    "what section or floor available in your shop",
]

answers = [
    "Hi. how can i help you today?",
    "We have shirts, pants, and shoes available in our store.",
    "Our store is open every day from 9 AM to 10 PM.",
    "We have a selection of sports apparel for various activities.",
    "Our men's clothing section includes a diverse range of styles and sizes to suit different preferences.",
    "Explore our women's clothing collection, featuring the latest trends and timeless classics.",
    "Discover our assortment of jewelry and accessories to complement your outfit.",
    "Yes, online payment is available for your convenience. You can securely purchase items directly from our website.",
    "Let me know if anything else I can assist you with. Have nice day",
    "We have sections for kids' clothing, sports apparel in first st and second floor, men's and women's clothing, as well as jewelry and accessories. Our kids' clothing section is located on the third floor.",
]


# Vectorize the questions
vectorizer = TfidfVectorizer()
VZ = vectorizer.fit_transform(questions)

def respond_to_user(input_text):
    # Vectorize the user input
    input_vector = vectorizer.transform([input_text])
   
    
    # Calculate cosine similarity between user input and training data
    similarities = cosine_similarity(input_vector, VZ)
    
    # Find the most similar question
    closest_index = np.argmax(similarities)
    
    # Return corresponding answer
   
    return answers[closest_index]

# Example interaction

user_input = sys.argv[1] 
response = respond_to_user(user_input)
print(response)
