import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants";

export const styles = StyleSheet.create({
    modal: {
        backgroundColor: COLORS.WHITE,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    closeContainer: {
        gap: 10,
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: '10%',
        closeButton: {
        }
    },
    safeAreaView: {
        gap: 10,
        paddingVertical: 15,
        height: '100%',
        closeModal: {
          
            flexDirection: 'row',
            gap: 10,
            selfAlign: 'center'

        },
        backgroundColor: COLORS.WHITE,
        scrollView: {
            text: { fontSize: 20 },
            container: { width: '100%', },
            contentContainer: {
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '80%'
            },
            buttonContainer: {
                flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%',
                button: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '35%' }
            },
            formContainer: {
                gap: 10,
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: '10%',
            },
        }
    }
})