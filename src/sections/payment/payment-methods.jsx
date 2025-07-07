'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslate } from '@/locales';

import { Iconify } from 'src/components/iconify';

import { PaymentNewCardDialog } from './payment-new-card-dialog';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [{ value: 'credit', label: 'Credit / Debit card' }];

// ----------------------------------------------------------------------

export function PaymentMethods() {
  const newCard = useBoolean();
  const { t } = useTranslate('app');

  const [method, setMethod] = useState('credit');

  const handleChangeMethod = useCallback((newValue) => {
    setMethod(newValue);
  }, []);

  return (
    <>
      <Stack spacing={5}>
        <Typography variant="h6">{t('payment.paymentMethod')}</Typography>

        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((option) => (
            <OptionItem
              key={option.label}
              option={{ ...option, label: t('payment.cards') }}
              selected={method === option.value}
              isCredit={option.value === 'credit' && method === 'credit'}
              onOpen={newCard.onTrue}
              onClick={() => handleChangeMethod(option.value)}
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}

function OptionItem({ option, selected, isCredit, onOpen, ...other }) {
  const { value, label } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        ...(selected && { boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.text.primary}` }),
      }}
      {...other}
    >
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center">
            <Iconify
              icon={selected ? 'eva:checkmark-circle-2-fill' : 'eva:radio-button-off-fill'}
              width={24}
              sx={{ mr: 2, color: selected ? 'primary.main' : 'text.secondary' }}
            />

            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>
            {/* 
            <Stack spacing={1} direction="row" alignItems="center">
              {value === 'credit' && (
                <>
                  <Iconify icon="logos:mastercard" width={24} />
                  ,
                  <Iconify icon="logos:visa" width={24} />
                </>
              )}
              {value === 'paypal' && <Iconify icon="logos:paypal" width={24} />}
              {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={24} />}
            </Stack> */}
          </Stack>
        }
        primaryTypographyProps={{ typography: 'subtitle2' }}
      />
    </Paper>
  );
}
