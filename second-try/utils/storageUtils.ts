import AsyncStorage from "@react-native-async-storage/async-storage";

/*---------------------------------------------------low level access functions---------------------------------------*/

export async function saveData (storage_key: string, data: object): Promise<void> {
  const stringifiedData = JSON.stringify(data)
    try {
        await AsyncStorage.setItem(storage_key, stringifiedData);
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

export async function saveCollection (collection: object, storage_key: string): Promise<void> {
  const stringifiedData = JSON.stringify(collection)
  try {
    await AsyncStorage.setItem(storage_key, stringifiedData);
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

/*---------------------------------------------------settings functions---------------------------------------*/

export async function loadSettings (setSettings: (settings: string) => void):Promise<void> {
  try {
    const val = await AsyncStorage.getItem('Settings');
    if (val !== null) {
      const data = JSON.parse(val);
      setSettings(data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function saveSettings (settings: object): Promise<void> {
  const stringifiedData = JSON.stringify(settings)
  try {
    await AsyncStorage.setItem("Settings", stringifiedData);
  } catch (e) {
    console.log(e);
  }
}