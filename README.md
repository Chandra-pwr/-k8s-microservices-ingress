
# 🚀 Kubernetes Microservices Architecture with Ingress & MongoDB

<p align="center">
  <b>Production-style microservices deployment using Kubernetes</b><br>
  Path-based routing • Custom Docker Images • MongoDB Integration
</p>

---

## 📌 Overview

This project demonstrates a **real-world microservices architecture** deployed on Kubernetes.

It uses **NGINX Ingress Controller** to route traffic to multiple services through a single entry point and integrates **MongoDB** for persistent data storage in the Cart service.

---

## 🏗️ Architecture

            ┌────────────────────┐
            │   NGINX Ingress    │
            └────────┬───────────┘
                     │

┌────────────┬────────────┬────────────┬────────────┬────────────┐
│ │ │ │ │ │
Frontend Backend Mobile Laptop Cart
(/) (/api) (/mobile) (/laptop) (/cart)
│
MongoDB


---

## ⚙️ Tech Stack

| Technology | Purpose |
|----------|--------|
| Kubernetes | Container orchestration |
| Docker | Containerization |
| NGINX Ingress | Traffic routing |
| MongoDB | Database |
| Node.js | Backend (Cart Service) |

---

## 🚀 Features

- ✅ Path-based routing using Ingress  
- ✅ Microservices architecture  
- ✅ Custom Docker images  
- ✅ MongoDB integration (persistent storage)  
- ✅ REST API for Cart service  
- ✅ Scalable deployments  

---

## 📁 Project Structure


k8s-microservices-ingress/
│
├── k8s/
│ ├── mongodb.yaml
│ ├── app.yaml
│ ├── ingress.yaml
│
├── cart/
│ ├── app.js
│ ├── Dockerfile
│
├── screenshots/
│
└── README.md


---

## 🚀 Setup Instructions

### 1️⃣ Start Kubernetes Cluster

```bash
minikube start
minikube addons enable ingress
2️⃣ Deploy MongoDB
kubectl apply -f k8s/mongodb.yaml
3️⃣ Deploy Applications
kubectl apply -f k8s/app.yaml
4️⃣ Deploy Ingress
kubectl apply -f k8s/ingress.yaml
5️⃣ Get External IP
kubectl get svc -n ingress-nginx
6️⃣ Configure Host

Edit hosts file:

sudo nano /etc/hosts

Add:

<EXTERNAL-IP> myapp.example.com