import React, { createContext, ReactNode, useState, useContext } from 'react';

const initialContext = {
    collapsed: false,
    setCollapsed: (collapsed: boolean): any => collapsed,
};

const Context = createContext(initialContext);

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return <Context.Provider value={{ collapsed, setCollapsed }}>{children}</Context.Provider>;
};

const useLayoutDasboard = () => {
    const value = useContext(Context);

    const { collapsed, setCollapsed } = value;

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return { collapsed, toggleCollapsed };
};

export { ProviderLayout, useLayoutDasboard };
