import { createContext, ReactElement, useState } from "react";
import {loadAllCollectionNames, saveCollection as saveCollectionToDisk, deleteCollection} from './storageUtils'

interface Collection {
    entrySchema: Object;
    notes?: String;
    entries: Entry[];
}

type Entry = {
    ID: string;
    [propName: string]: any;
}

const defaultCollection: Collection = {
    entrySchema: {},
    notes:"",
    entries: []
}

const AppDataContext = createContext({})

export const AppDataContextProvider = (props: any): ReactElement => {
    const [collectionNames, setCollectionNames] = useState<string[]>([])
    const [currentCollection, setCurrentCollection] = useState<Collection>(defaultCollection)

    const saveCollection = (collectionToSave: Collection, collectionName: any) => {
        const tempCollectionNames: string[] = [...collectionNames]
        if (!(tempCollectionNames.indexOf(collectionName))) {
            setCollectionNames([...tempCollectionNames, collectionName])
        }

        saveCollectionToDisk(collectionToSave, collectionName)
    }

    const removeCollection = async (collectionName: string) => {
        deleteCollection(collectionName)
        let updatedNameList = collectionNames.filter(name => name != collectionName)
        setCollectionNames(updatedNameList)
    }

    const saveEntries = (entries: Entry[]) => {
        setCurrentCollection({
            ...currentCollection,
            entries: entries
        })
    }

    const removeEntry = (entryID: string) => {
        let updatedEntries = currentCollection.entries.filter(entry => entry.ID != entryID)
        saveEntries(updatedEntries)
    }

    return (
        <AppDataContext.Provider value={{
            collectionNames,
            setCollectionNames,
            currentCollection,
            setCurrentCollection,
            saveCollection,
            removeCollection,
            removeEntry
        }}>
            {props.children}
        </AppDataContext.Provider>
    )
}