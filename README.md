# ☸️ Kubernetes Microservices Architecture with Ingress & MongoDB

<p align="center">
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</p>

<p align="center">
  <b>Production-style microservices deployment on Kubernetes</b><br/>
  Path-based routing • Custom Docker Images • MongoDB Integration
</p>

---

## 📌 Overview

This project demonstrates a **real-world microservices architecture** deployed on Kubernetes.

It uses **NGINX Ingress Controller** to route traffic to 5 independent services through a single entry point and integrates **MongoDB** as a persistent database for the Cart service.

---

## 🏗️ Architecture
              ┌──────────────────────────────────┐
              │      NGINX Ingress Controller     │
              │        (Single Entry Point)       │
              └──────────────┬───────────────────┘
                             │
    ┌──────────┬─────────────┼─────────────┬──────────┐
    │          │             │             │          │
    ▼          ▼             ▼             ▼          ▼
Frontend     Backend        Mobile        Laptop     Cart
Svc          Svc           Svc           Svc        Svc
/           /api         /mobile       /laptop    /cart
│
┌────▼─────┐
│ MongoDB  │
│   Pod    │
└──────────┘

---

## ⚙️ Tech Stack

| Technology | Purpose | Notes |
|---|---|---|
| Kubernetes | Container orchestration | v1.28+ |
| Docker | Build & containerize services | Custom images |
| NGINX Ingress | Path-based traffic routing | controller-v1.9.4 |
| MongoDB | Persistent storage for Cart | mongo:6.0 |
| Node.js + Express | Cart service REST API | v18-alpine |
| nginx:alpine | Base image for HTML services | Latest |
| AWS EKS / Minikube | Kubernetes cluster | Cloud or Local |

---

## 🚀 Features

- ✅ Path-based routing using Nginx Ingress Controller
- ✅ 5 independent microservices with custom Docker images
- ✅ MongoDB StatefulSet with PersistentVolumeClaim
- ✅ Node.js REST API for Cart with full CRUD operations
- ✅ Production-grade Kubernetes YAML manifests
- ✅ Works on both Minikube (local) and AWS EKS (cloud)

---

## 📁 Project Structure
k8s-microservices-ingress/
│
├── k8s/
│   ├── mongodb.yaml        # MongoDB StatefulSet + PVC + Service
│   ├── app.yaml            # All 5 Deployments + Services
│   └── ingress.yaml        # Ingress path routing rules
│
├── frontend/
│   ├── index.html
│   └── Dockerfile
│
├── mobile/
│   ├── index.html
│   └── Dockerfile
│
├── laptop/
│   ├── index.html
│   └── Dockerfile
│
├── cart/
│   ├── app.js              # Express REST API
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── index.html
│   └── Dockerfile
│
├── screenshots/
└── README.md

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/k8s-microservices-ingress.git
cd k8s-microservices-ingress
```

### 2️⃣ Build Docker Images

```bash
DOCKERID=yourdockerhubid

docker build -t $DOCKERID/shopzone-frontend:v1  ./frontend
docker build -t $DOCKERID/shopzone-mobile:v1    ./mobile
docker build -t $DOCKERID/shopzone-laptop:v1    ./laptop
docker build -t $DOCKERID/shopzone-cart:v1      ./cart
docker build -t $DOCKERID/shopzone-backend:v1   ./backend
```

### 3️⃣ Push to Docker Hub

```bash
docker login

docker push $DOCKERID/shopzone-frontend:v1
docker push $DOCKERID/shopzone-mobile:v1
docker push $DOCKERID/shopzone-laptop:v1
docker push $DOCKERID/shopzone-cart:v1
docker push $DOCKERID/shopzone-backend:v1
```

### 4️⃣ Install Nginx Ingress Controller

```bash
# For AWS EKS
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/aws/deploy.yaml

# For Minikube
minikube addons enable ingress

# Wait for controller to be Ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

### 5️⃣ Deploy MongoDB

```bash
kubectl apply -f k8s/mongodb.yaml

# Verify MongoDB is running
kubectl get pods | grep mongo
```

### 6️⃣ Deploy All Services

```bash
kubectl apply -f k8s/app.yaml

# Verify all pods are Running
kubectl get pods
kubectl get svc
```

### 7️⃣ Deploy Ingress Rules

```bash
kubectl apply -f k8s/ingress.yaml

# Verify ingress
kubectl get ingress
kubectl describe ingress shopzone-ingress
```

### 8️⃣ Configure Host & Test

```bash
# Get External IP
kubectl get svc -n ingress-nginx

# Add to /etc/hosts
echo "<EXTERNAL-IP>  myapp.example.com" | sudo tee -a /etc/hosts
```

---

## 🌐 Application Endpoints

## 🌐 Application Endpoints

| Service | URL | Description |
|---|---|---|
| 🏠 Frontend | `http://ae25b6f9ea9484b31ab0452add2afc0c-31a8c1cec8261d41.elb.us-east-1.amazonaws.com/` | ShopZone Home Page |
| ⚙️ Backend | `http://ae25b6f9ea9484b31ab0452add2afc0c-31a8c1cec8261d41.elb.us-east-1.amazonaws.com/api` | Backend Service |
| 📱 Mobile | `http://ae25b6f9ea9484b31ab0452add2afc0c-31a8c1cec8261d41.elb.us-east-1.amazonaws.com/mobile` | Mobile Store |
| 💻 Laptop | `http://ae25b6f9ea9484b31ab0452add2afc0c-31a8c1cec8261d41.elb.us-east-1.amazonaws.com/laptop` | Laptop Store |
| 🛒 Cart | `http://ae25b6f9ea9484b31ab0452add2afc0c-31a8c1cec8261d41.elb.us-east-1.amazonaws.com/cart` | Cart Service (MongoDB) |
---

## 📡 Cart API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cart` | Get all cart items |
| `POST` | `/cart` | Add item `{name, price, qty}` |
| `DELETE` | `/cart/:id` | Remove item by ID |

```bash
# Get all items
curl http://myapp.example.com/cart

# Add item
curl -X POST http://myapp.example.com/cart \
  -H 'Content-Type: application/json' \
  -d '{"name": "iPhone 15 Pro", "price": 129999, "qty": 1}'

# Delete item
curl -X DELETE http://myapp.example.com/cart/<item-id>
```

---

## 🍃 MongoDB Integration

- MongoDB runs as a **StatefulSet** for stable network identity
- **PersistentVolumeClaim** (1Gi) ensures data survives pod restarts
- Cart service connects via internal DNS: `mongodb://mongo-svc:27017/shopzone`
- `MONGO_URL` injected as environment variable in cart Deployment

```bash
# Verify MongoDB
kubectl get pods | grep mongo
kubectl get pvc

# Connect to MongoDB shell
kubectl exec -it mongo-0 -- mongosh
> use shopzone
> db.cartitems.find()
```

---

## ✅ Verification Commands

```bash
kubectl get pods                          # All pods Running
kubectl get svc                           # All services listed
kubectl get ingress                       # ADDRESS column shows IP
kubectl get pvc                           # STATUS shows Bound
kubectl describe ingress shopzone-ingress # Shows all 5 path rules
kubectl top pods                          # CPU/memory usage
```

---

## 🔧 Troubleshooting

**Pod stuck in Pending**
```bash
kubectl describe pod <pod-name>
# Check Events section — common cause: image pull error
```

**Ingress returning 404**
```bash
kubectl get pods -n ingress-nginx         # Controller must be Running
kubectl describe ingress shopzone-ingress # Verify path rules
```

**MongoDB connection refused**
```bash
kubectl get pods | grep mongo             # Must be Running
kubectl logs <cart-pod-name>              # Check connection logs
```

**Image pull error**
```bash
kubectl describe pod <pod-name> | grep Image
# Verify image name matches Docker Hub exactly
```

---

## 📸 Screenshots

> Add your screenshots inside the `screenshots/` folder and reference them here.

| Step | Screenshot |
|---|---|
| All Pods Running | `screenshots/pods-running.png` |
| Ingress Rules | `screenshots/ingress.png` |
| Home Page | `screenshots/frontend.png` |
| Mobile Page | `screenshots/mobile.png` |
| Laptop Page | `screenshots/laptop.png` |
| Cart Page | `screenshots/cart.png` |


> **Note:** This URL is temporary (AWS ELB). 
> Cluster has been deleted after project completion to avoid AWS charges.
> Screenshots above show the live working project.