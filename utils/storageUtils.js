import AsyncStorage from "@react-native-async-storage/async-storage";

//TODO on final interation, rename all of these in the context of collections.
// e.g. saveCollection, loadCollection, getAllCollections, etc.

export const saveData = async (data, storage_key) => {
  try {
    await AsyncStorage.setItem(storage_key, data);
  } catch (e) {
    console.log(e);
  }
};

export const loadData = async (setStoredData, storage_key) => {
  try {
    let val = await AsyncStorage.getItem(storage_key);
    val = val != null ? JSON.parse(val) : null;
    setStoredData(val);
  } catch (e) {
    console.log(e);
  }
};

export const getAllKeys = async (setCollections) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    setCollections(keys);
  } catch (e) {
    console.log(e);
  }
};

export const deleteCollection = async (collection_key) => {
  try {
    await AsyncStorage.removeItem(collection_key);
  } catch (e) {
    console.log(e);
  }
};
