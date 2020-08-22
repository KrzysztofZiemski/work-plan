import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import laptopImg from '../../../assets/laptop.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: '5%',
        alignItems: 'center',
        [theme.breakpoints.up('xs')]: {
            flexDirection: 'column'
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        },
    },
    article: {
        display: 'flex',
        flexDirection: 'column',
    },
    articleHeader: {
        fontSize: '3em',
        margin: 20
    },
    articleParagraph: {
        fontSize: '1.4em',
        lineHeight: 1.5,
        margin: 20
    },
    aside: {
        width: '50%',
        alignSelf: 'center',
    },
    asideImg: {
        width: '100%',

    }
}))

export const AboutCrm = () => {

    const classes = useStyles()

    return (
        <section className={classes.root}>
            <article className={classes.article}>
                <h2 className={classes.articleHeader}>Co to jest CRM?</h2>
                <p className={classes.articleParagraph}>CRM oznacza zarządzanie relacjami z klientem.
                Dzisiejsze systemy CRM, jednak mocno wykraczają poza tą definicję.
                Dzisiaj za pomocą systemów CRM, można monitorować wszystkie procesy w swojej firmie.
                Zarówno odpowiadające za sprzedaż oraz kontakt z klientem, jak i za efektywność pracowników.
                Systemy CRM analizują dane dotyczące każdego aspektu zarządzania firmą.
                Mozna otrzymać potrzebne informację za pomocą kilku kliknięć myszką, zamiast godzin w oczekiwaniu na raporty od pracowników.
                </p>
            </article>
            <aside>
                <img className={classes.asideImg} src={laptopImg} alt="crm screen" />
            </aside>
        </section>
    );
};

