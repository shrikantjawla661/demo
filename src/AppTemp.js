import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, VStack, } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';

function App() {
  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <Formik
      initialValues={{ name: 'Sasuke' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form style={{ width: '40%', margin: 'auto', border: '1px solid red', padding: '15px', marginTop: '180px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <VStack w='full' h='fit-content' mb={'20px'} gap={'0px'}>
            <Text w='full' fontSize={'35px'} fontWeight={'700'} textAlign={'center'}>Login or Signup</Text>
            <Text w='full' fontSize={'14px'} textAlign={'center'} fontWeight={'500'}>We will send an OTP to verify</Text>
          </VStack>
          <Field name='name' validate={validateName}>
            {({ field, form }) => (
              <FormControl w={'76%'} m={'auto'} isInvalid={form.errors.name && form.touched.name}>
                <Input {...field} placeholder='Enter Phone' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <HStack w={'76%'} m={'auto'} align={'flex-start'}>
            <Checkbox></Checkbox>
            <Text fontSize={'14px'}>By clicking here you are agreeing to our Terms & Conditions and Privacy Policy</Text>
          </HStack>
          <HStack w={'full'}>
            <Button
              w={'76%'}
              m={'auto'}
              mt={4}
              bg={'#019ef7'}
              color={'white'}
              isLoading={props.isSubmitting}
              type='submit'
            >
              Continue
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}

export default App;
