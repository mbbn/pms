import {useState} from 'react';

export default function useLocalStorage(keyName:string, defaultValue:any): [any, (newValue:any) => void] {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = localStorage.getItem(keyName);
            if(value) {
                return JSON.parse(value);
            } else {
                localStorage.setItem(keyName, defaultValue);
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue:any)=>{
        try {
            localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.log(err);
        }
        setStoredValue(newValue);
    }
    return [storedValue, setValue];
}