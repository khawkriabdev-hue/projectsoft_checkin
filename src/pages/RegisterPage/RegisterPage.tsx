// pages/RegisterPage.tsx

import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from 'apiService/modules/auth/auth.service';

export default function RegisterPage() {
    const [searchParams] = useSearchParams();

    const handleGoogleLogin = async () => {
        const token = searchParams.get('token');

        if (!token) {
            throw new Error('Invitation token not found');
        }

        const auth = getAuth();

        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        await authService.registerWithInvitation({
            token,
            email: result.user.email!,
            display_name: result.user.displayName ?? '',
            photo_url: result.user.photoURL ?? undefined,
        });

        window.location.href = '/';
    };

    return (
        <Container maxWidth='sm'>
            <Stack justifyContent='center' minHeight='100vh'>
                <Card>
                    <CardContent>
                        <Stack spacing={3}>
                            <Typography variant='h4' textAlign='center'>
                                Register
                            </Typography>

                            <Typography variant='body1' textAlign='center'>
                                Sign in to create your account
                            </Typography>

                            <Button variant='contained' size='large' onClick={handleGoogleLogin}>
                                Continue with Google
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}
