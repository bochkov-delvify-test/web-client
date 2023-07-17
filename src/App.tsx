import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { JWTProvider, UserProvider } from './providers';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes.tsx';
import { mainThemeLight } from './themes.ts';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// TODO: Add Error Pages
// https://ui.mantine.dev/category/error-pages

export default function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                theme={{ colorScheme, ...mainThemeLight }}
                withGlobalStyles
                withNormalizeCSS
            >
                <Notifications />
                <UserProvider>
                    <JWTProvider>
                        <BrowserRouter>
                            <AppRoutes />
                        </BrowserRouter>
                    </JWTProvider>
                </UserProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
