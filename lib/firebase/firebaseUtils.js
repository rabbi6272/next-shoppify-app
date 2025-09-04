"use client";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Collection names
export const COLLECTIONS = {
  ADMINS: "admins",
  PRODUCTS: "products",
  USERS: "users",
};

// Generic function to add a document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Generic function to update a document
export const updateDocument = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Generic function to delete a document
export const deleteDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Generic function to get a document by ID
export const getDocumentById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Generic function to get documents by a field value
export const getDocumentsByField = async (collectionName, field, value) => {
  try {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents by field:", error);
    throw error;
  }
};

// Generic function to get all documents in a collection
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting all documents:", error);
    throw error;
  }
};

// Function to upload an image to Firebase Storage
export const uploadImage = async (file, path) => {
  if (!file) return null;

  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return {
      url,
      path: snapshot.ref.fullPath,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to delete an image from Firebase Storage
export const deleteImage = async (path) => {
  if (!path) return;

  const storageRef = ref(storage, path);

  try {
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Save a new product
export const saveProduct = async (productData) => {
  return await addDocument(COLLECTIONS.PRODUCTS, productData);
};

// Get all products
export const getAllProducts = async () => {
  return await getAllDocuments(COLLECTIONS.PRODUCTS);
};

// Get products by category
export const getProductsByCategory = async (category) => {
  if (category === "All") {
    return await getAllProducts();
  }
  return await getDocumentsByField(COLLECTIONS.PRODUCTS, "category", category);
};
