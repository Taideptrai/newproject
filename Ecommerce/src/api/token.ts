export interface IToken {
    accessToken: string;
    expiredIn: number;
    type: string;
}

const setToken = ({
    token,
    remember = true,
}: {
    token?: IToken;
    remember?: boolean;
}): void => {
    if (!token) {
        return;
    }

    const tokenString = JSON.stringify(token);

    if (remember) {
        return localStorage.setItem('token', tokenString);
    }

    return sessionStorage.setItem('token', tokenString);
};

const getToken = (): string | null => {
    const tokenString =
        localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!tokenString) {
        return null;
    }

    const token: IToken = JSON.parse(tokenString);

    return token.accessToken;
};

const removeToken = (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

export {setToken, getToken, removeToken};
