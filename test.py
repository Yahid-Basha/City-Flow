# app.py (Windows version)
import streamlit as st
import torch
from transformers import pipeline
from torchvision.models import resnet18, ResNet18_Weights
from torchvision import transforms
from PIL import Image
import torch.nn as nn

st.title("🧠 Text + 🖼️ Image Sentiment Analysis")

# ---------------------------
# Load Pretrained Text Model
# ---------------------------
st.header("📝 Text Sentiment Analysis")
text_classifier = pipeline(
    'sentiment-analysis',
    model='distilbert-base-uncased-finetuned-sst-2-english',
    device=-1  # Force CPU (remove if you're using GPU and want to use device=0)
)

user_input = st.text_area("Enter text:")
if user_input:
    result = text_classifier(user_input)
    st.write(f"**Sentiment:** {result[0]['label']}")
    st.write(f"**Confidence:** {result[0]['score']:.2f}")

# ---------------------------
# Image Sentiment Analysis (Placeholder logic)
# ---------------------------
st.header("🖼️ Image Sentiment Analysis")

# Load pretrained ResNet18
model = resnet18(weights=ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, 2)  # Placeholder: 0 = Negative, 1 = Positive
model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

uploaded_file = st.file_uploader("Upload an image...", type=["jpg", "png"])
if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    input_tensor = preprocess(image).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.nn.functional.softmax(output[0], dim=0)
        confidence, pred = torch.max(probs, 0)

        label = "Positive" if pred.item() == 1 else "Negative"
        st.write(f"**Sentiment:** {label}")
        st.write(f"**Confidence:** {confidence.item():.2f}")
