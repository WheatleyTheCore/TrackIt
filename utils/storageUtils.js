import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (data, storage_key) => {
  try {
    await AsyncStorage.setItem(storage_key, data);
  } catch (e) {
    console.log(e);
  }
};

export const loadData = async (setStoredData, storage_key) => {
  try {
    const val = await AsyncStorage.getItem(storage_key);
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
