export function testProps(id?: string) {
  const newId = typeof id === 'string' ? id : 'MISSING_LABEL';
  return { testID: newId };
}
