import { useState } from "react";

function useCollectionList() {
    const [collectionList, setCollectionList] = useState([])

    return [collectionList, setCollectionList]
}



export default useCollectionList