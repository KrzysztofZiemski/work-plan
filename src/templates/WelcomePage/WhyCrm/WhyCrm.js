import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../../../components/PrimaryButton';
import ContactForm from '../ContactForm';


const useStyles = makeStyles(({
    root: {
        margin: '10px 0 50px 0'
    },
    article: {
        width: '70%',
        margin: '10px auto',
        lineHeight: 1.5,
    },
    title: {
        fontSize: '2em',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1.2em',
        margin: 12
    },
    button: {
        textAlign: 'center'
    },
}))


export const WhyCrm = () => {
    const classes = useStyles();
    const [isFormContactOpen, setIsFormContactOpen] = useState(false);

    const handleCloseFormContact = () => setIsFormContactOpen(false);
    const handleOpenFormContact = () => setIsFormContactOpen(true);

    return (
        <section className={classes.root}>
            <article className={classes.article}>
                <h2 className={classes.title}>Dlaczego warto mieć CRM?</h2>
                <p className={classes.paragraph}>
                    Uważasz, że Twoją firmę stać na więcej? Chcesz uporządkować procesy? Obiektywnie oceniać pracowników? Monitorować efektywność i szybko reagować na zmiany na rynku?
                </p>
                <p className={classes.paragraph}>
                    Jeżeli na którekolwiek pytanie odpowiesz tak, to na pewno potrzebujesz dostosowanego do Ciebie systemu CRM. Obecnie nie istnieje żadna większa firma, która by nie korzystała z systemów CRM.
                </p>
                <p className={classes.paragraph}>
                    Profesjonalne systemy CRM często wiążą się z dużymi wydatkami, jednak naszą ofertę stworzył niezależny zespół deweloperów.
                    Bez żadnych pośredników. Zapewniamy pomoc we wdrożeniu.
                </p>
                <p className={classes.paragraph}>
                    Już od <strong>1000 zł</strong>!.
                </p>
            </article>
            <div className={classes.button}>
                <PrimaryButton onClick={handleOpenFormContact}>
                    napisz do nas
                </PrimaryButton>
            </div>
            <ContactForm open={isFormContactOpen} setClose={handleCloseFormContact} />
        </section>
    );
};
