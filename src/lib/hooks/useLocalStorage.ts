import { useState } from 'react';

interface IUseLocalStorage<T> {
    keyName: string;
    defaultValue: T;
}

export const useLocalStorage = <T>({
    keyName,
    defaultValue,
}: IUseLocalStorage<T>): [T, (newValue: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value) as T;
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue),
                );
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.log(err);
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};
