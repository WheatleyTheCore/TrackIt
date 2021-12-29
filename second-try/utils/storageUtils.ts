import AsyncStorage from "@react-native-async-storage/async-storage";

//functions to implement: 
//saveData, loadData,
//loadAllCollectionNames, saveCollection, updateCollection, deleteCollection
//loadAllEntries, deleteEntry, saveEntry, updateEntry, deleteEntry, loadSettings, saveSettings

/*---------------------------------------------------low level access functions---------------------------------------*/

export async function saveData (storage_key: string, data: string): Promise<void> {
    try {
        await AsyncStorage.setItem(storage_key, data);
      } catch (e) {
        console.log(e);
      }
}

//load data into state, takes setState as a parameter
export async function loadData (setData: (data: string) => void, storage_key: string): Promise<void> {
    try {
        const val = await AsyncStorage.getItem(storage_key);
        if (val !== null) {
          const data = JSON.parse(val);
          setData(data);
        }
      } catch (e) {
        console.log(e);
      }
}

/*---------------------------------------------------collection functions---------------------------------------*/

export async function loadAllCollectionNames (setCollectionNames: (keys: string[]) => void): Promise<void> {
    try {
        const keys = await AsyncStorage.getAllKeys();
        setCollectionNames(keys);
      } catch (e) {
        console.log(e);
      }
}

export async function deleteCollection (collection_key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(collection_key)
    } catch (e) {
        console.log(e)
    }
}

/*---------------------------------------------------entry functions---------------------------------------*/

/*---------------------------------------------------settings functions---------------------------------------*/