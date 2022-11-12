/**
 * Custom hook for keeping state data sync with localStorage.
 * 
 * Creates "storedValue" as state and look in localStorage for a current value.
 * If not found, default to "initalValue".
 * 
 * UseEffect re-runs when "storedValue" updates :
 * if storedValue is null - removed from localStorage,
 * else update localStorage with the new storedValue.
 * 
 * 
 */

import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;

