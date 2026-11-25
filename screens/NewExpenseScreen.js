import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

function today() {
  const date = new Date();
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(value => String(value).padStart(2, '0')).join('/');
}

function validDate(text) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
  if (!match) return false;
  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function Field({ label, error, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput accessibilityLabel={label} style={[styles.input, error && styles.invalid]}
        placeholderTextColor="#60716B" {...props} />
      {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    </View>
  );
}

export default function NewExpenseScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today);
  const [checked, setChecked] = useState(false);

  const amountText = amount.trim();
  const cents = Math.round(Number(amountText.replace(',', '.')) * 100);
  const validAmount = /^\d+([.,]\d{1,2})?$/.test(amountText) && Number.isSafeInteger(cents) && cents > 0;
  const descriptionError = checked && !description.trim() && 'Descreva o gasto.';
  const amountError = checked && !validAmount && 'Informe um valor positivo com até duas casas decimais.';
  const dateError = checked && !validDate(date) && 'Informe uma data válida no formato DD/MM/AAAA.';
  const [confirmed, setConfirmed] = useState(false);

  function change(setValue, text) {
    setValue(text);
    setConfirmed(false);
  }

  function validate() {
    Keyboard.dismiss();
    setChecked(true);
    setConfirmed(Boolean(description.trim()) && validAmount && validDate(date));
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Field label="Descrição" value={description} onChangeText={text => change(setDescription, text)}
        placeholder="Ex.: lanche na cantina" error={descriptionError} />
      <Field label="Valor (R$)" value={amount} onChangeText={text => change(setAmount, text)}
        placeholder="0,00" keyboardType="decimal-pad" error={amountError} />
      <Field label="Data" value={date} onChangeText={text => change(setDate, text)}
        placeholder="DD/MM/AAAA" maxLength={10} error={dateError} />
      <Pressable accessibilityRole="button" onPress={validate}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Conferir gasto</Text>
      </Pressable>
      {confirmed && <Text accessibilityLiveRegion="polite" style={styles.success}>Dados do gasto conferidos.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#163C34' },
  content: { width: '100%', maxWidth: 540, alignSelf: 'center', padding: 24, gap: 20 },
  field: { gap: 6 },
  label: { color: '#FFF5D8', fontSize: 16, fontWeight: '600' },
  input: { minHeight: 48, backgroundColor: '#FFF5D8', color: '#163C34', fontSize: 17,
    borderRadius: 8, borderWidth: 2, borderColor: 'transparent', paddingHorizontal: 12 },
  invalid: { borderColor: '#D24E32' },
  error: { color: '#FFCBBA', fontSize: 14 },
  button: { alignItems: 'center', backgroundColor: '#FFD065', borderRadius: 8, padding: 14 },
  pressed: { opacity: 0.8 },
  buttonText: { color: '#163C34', fontSize: 16, fontWeight: '700' },
  success: { color: '#FFF5D8', fontSize: 16 },
});
