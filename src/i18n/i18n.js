import { createI18n } from "vue-i18n";
import ptBR from './messages/pt-BR.json';
import en from './messages/en.json';
import es from './messages/es.json'

const messages = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
}

const i18n = createI18n({
    locale: 'pt-BR',
    fallbackLocale: 'en',
    messages
})

export default i18n