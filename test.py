# app.py
#pip install streamlit transformers torch torchvision pillow
#streamlit run app.py

#
import streamlit as st
from transformers import pipeline
from torchvision import models, transforms
from PIL import Image
import torch
import torch.nn as nn

# ---------------------------
# Load Pretrained Text Model
# ---------------------------
st.title("Text + Image Sentiment Analysis")

text_classifier = pipeline('sentiment-analysis')  # Uses distilbert-base-uncased-finetuned-sst-2-english

st.header("📝 Text Sentiment Analysis")
user_input = st.text_area("Enter text:")
if user_input:
    result = text_classifier(user_input)
    st.write(f"**Sentiment:** {result[0]['label']}")
    st.write(f"**Confidence:** {result[0]['score']:.2f}")

# ---------------------------
# Load Image Model (Placeholder)
# ---------------------------
st.header("🖼️ Image Sentiment Analysis")

# Load pre-trained ResNet18 model
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 2)  # Assuming binary sentiment
# NOTE: This should be your own fine-tuned model checkpoint
# For demo purposes, we use the untrained fc layer
# model.load_state_dict(torch.load('path_to_finetuned_model.pth', map_location='cpu'))
model.eval()

# Image preprocessing
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

uploaded_file = st.file_uploader("Upload an image...", type=["jpg", "png"])
if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    # Process and predict
    input_tensor = preprocess(image).unsqueeze(0)  # Add batch dimension
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.nn.functional.softmax(output[0], dim=0)
        confidence, pred = torch.max(probs, 0)

        # Placeholder labels: 0 = Negative, 1 = Positive
        label = "Positive" if pred.item() == 1 else "Negative"
        st.write(f"**Sentiment:** {label}")
        st.write(f"**Confidence:** {confidence.item():.2f}")
