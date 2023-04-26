import {
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

function TypeModal({ isVisible, closeModal,changeUserType }) {
  return (
    <>
      {isVisible && (
        <HStack
          w={"100vw"}
          h={"100vh"}
          position={"fixed"}
          top={0}
          left={0}
          bg={"blackAlpha.700"}
          zIndex={18}
        >
          <HStack
            boxShadow={
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
            }
            bg={"white"}
            zIndex={20}
            rounded={"15px"}
            w={"450px"}
            h={"200px"}
            pos={"absolute"}
            top={"50%"}
            left={"50%"}
            style={{ transform: "translate(-50%,-50%)" }}
            justify={"center"}
            align={"center"}
          >
            <Button
              colorScheme="blue"
              rounded={"18px"}
              size={"lg"}
              onClick={() => {
                changeUserType("1");
              }}
            >
              Salaried
            </Button>
            <Button
              colorScheme="blue"
              rounded={"18px"}
              size={"lg"}
              onClick={() => {
                changeUserType("2");
              }}
            >
              Self-Employed
            </Button>
          </HStack>
        </HStack>
      )}
    </>
  );
}

export default TypeModal;
