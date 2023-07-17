import { FC, ReactElement, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Footer, Header } from './index.ts';

export const Page: FC<{
    children: ReactNode;
    navbar?: ReactElement | undefined;
}> = ({ children, navbar }) => {
    return (
        <AppShell
            padding="xl"
            header={<Header />}
            footer={<Footer />}
            navbar={navbar}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    );
};
