import { upperFirst, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { notifications } from '@mantine/notifications';

import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Loader,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { emailValidator, passwordValidator } from '../lib/validators.ts';
import React, { useState } from 'react';
import {
    CreateUserParams,
    createUserRequest,
    getUserRequest,
    LoginParams,
    loginRequest,
} from '../endpoints';
import { Page } from '../components';
import { JWT } from '../model';
import { useJWT, useUser } from '../providers';

export function Login(props: PaperProps) {
    const navigate = useNavigate();
    const { storeJWT } = useJWT();
    const { storeUser } = useUser();
    const [action, toggleAction] = useToggle(['login', 'register']);
    const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            terms: true,
        },
        validate: {
            email: emailValidator,
            password: passwordValidator,
        },
    });

    const onCreateUser = (params: CreateUserParams) => {
        setIsCreateUserLoading(true);
        createUserRequest(params)
            .then(() => {
                toggleAction();
                notifications.show({
                    title: 'Registration successful!',
                    message: 'You can now login with your credentials',
                    color: 'green',
                });
            })
            .finally(() => {
                setIsCreateUserLoading(false);
                form.reset();
            });
    };

    const onLogin = (params: LoginParams) => {
        setIsLoginLoading(true);
        loginRequest(params)
            .then((jwt: JWT) => {
                if (jwt.token_type == 'bearer') {
                    storeJWT(`Bearer ${jwt.access_token}`);
                    getUserRequest()
                        .then((data) => {
                            storeUser(data);
                            navigate('/');
                        })
                        .catch((error) => {
                            console.error('Failed to get user:', error);
                            throw error;
                        });
                }
            })
            .finally(() => {
                setIsLoginLoading(false);
                form.reset();
            });
    };

    return (
        <Page>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    Welcome to To Do List 🎊!
                </Text>

                {(isCreateUserLoading || isLoginLoading) && <Loader />}

                {!(isCreateUserLoading || isLoginLoading) && (
                    <React.Fragment>
                        <Divider
                            label={upperFirst(action)}
                            labelPosition="center"
                            my="lg"
                        />

                        <form
                            onSubmit={form.onSubmit((values) => {
                                action === 'login'
                                    ? onLogin(values as LoginParams)
                                    : onCreateUser(values as CreateUserParams);
                            })}
                        >
                            <Stack>
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="example@todo.list"
                                    value={form.values.email}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            'email',
                                            event.currentTarget.value,
                                        )
                                    }
                                    error={form.errors.email && 'Invalid email'}
                                    radius="md"
                                />

                                <PasswordInput
                                    required
                                    label="Password"
                                    placeholder="Your password"
                                    value={form.values.password}
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            'password',
                                            event.currentTarget.value,
                                        )
                                    }
                                    error={
                                        form.errors.password &&
                                        'Password should include at least 8 characters'
                                    }
                                    radius="md"
                                />

                                {action === 'register' && (
                                    <Checkbox
                                        label="I accept terms and conditions"
                                        checked={form.values.terms}
                                        onChange={(event) =>
                                            form.setFieldValue(
                                                'terms',
                                                event.currentTarget.checked,
                                            )
                                        }
                                    />
                                )}
                            </Stack>

                            <Group position="apart" mt="xl">
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="dimmed"
                                    onClick={() => toggleAction()}
                                    size="xs"
                                >
                                    {action === 'register'
                                        ? 'Already have an account? Login'
                                        : "Don't have an account? Register"}
                                </Anchor>
                                <Button
                                    type="submit"
                                    radius="xl"
                                    disabled={!form.values.terms}
                                >
                                    {upperFirst(action)}
                                </Button>
                            </Group>
                        </form>
                    </React.Fragment>
                )}
            </Paper>
        </Page>
    );
}
