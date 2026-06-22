// pages/InvitationPage.tsx

import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography, Chip } from '@mui/material';
import { CreateInvitationRequest, Invitation } from 'apiService/modules/invitations/invitation.types';
import { invitationService } from 'apiService/modules/invitations/invitation.service';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiMobileDatePicker } from 'components/common/MuiInput';
import dayjs from 'dayjs';

export default function InvitationPage() {
    const [loading, setLoading] = useState(false);
    const [invitations, setInvitations] = useState<Invitation[]>([]);

    const [form, setForm] = useState<CreateInvitationRequest>({
        email: '',
        redirect_url: '',
        expired_at: '',
    });

    const loadInvitations = async () => {
        const response = await invitationService.getInvitationList();

        setInvitations(response.invitations);
    };

    useEffect(() => {
        loadInvitations();
    }, []);

    const handleCreate = async () => {
        try {
            setLoading(true);

            await invitationService.createInvitation(form, 'admin_user_id');

            setForm({
                email: '',
                redirect_url: '',
                expired_at: '',
            });

            await loadInvitations();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={3}>
            <Typography variant='h4' mb={3}>
                Invitation Management
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant='h6' mb={2}>
                        Create Invitation
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label='Email'
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label='Redirect URL'
                                value={form.redirect_url}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        redirect_url: e.target.value,
                                    })
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MuiMobileDatePicker
                                    label='Expired At'
                                    value={form.expired_at ? dayjs(form.expired_at) : undefined}
                                    // minDate={leaveForm.startDate || undefined}
                                    onAccept={(newValue) => {
                                        setForm((prev) => ({ ...prev, expired_at: dayjs(newValue).format('YYYY-MM-DD') }));
                                    }}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                            // error: !leaveForm.endDate,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Button sx={{ mt: 2 }} variant='contained' onClick={handleCreate} disabled={loading}>
                        Create Invite Link
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant='h6' mb={2}>
                        Invitation List
                    </Typography>

                    <Stack spacing={2}>
                        {invitations.map((item) => (
                            <Card key={item.invitation_id} variant='outlined'>
                                <CardContent>
                                    <Typography>{item.email}</Typography>

                                    <Typography variant='body2' color='text.secondary'>
                                        {item.redirect_url}
                                    </Typography>

                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        {`${item.redirect_url}?token=${item.token}`}
                                    </Typography>

                                    <Stack direction='row' spacing={1} mt={2}>
                                        <Chip size='small' label={item.status} />

                                        <Chip size='small' label={new Date(item.created_at).toLocaleString()} />
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
