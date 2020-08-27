import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import laptopImgMax from '../../../assets/laptop-max.jpg';
import laptopImgMiddle from '../../../assets/laptop-middle.jpg';
import laptopImgMin from '../../../assets/laptop-min.jpg';
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
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
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
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
    },
    asideImg: {
        width: '100%',

    }
}))

export const AboutErp = () => {

    const classes = useStyles()

    return (
        <section className={classes.root}>
            <article className={classes.article}>
                <h2 className={classes.articleHeader}>Co to jest ERP?</h2>
                <p className={classes.articleParagraph}>ERP oznacza system do zarządzania przedsiebiorstwem.
                Monitorowanie kosztów, weryfikacja wydajności, uzyskanie przewagi konkurencyjnej - to główne założenia systemów ERP.
                Systemy ERP różnią się między sobą zakresem usług.
                Mogą stanowić świetną bazę kadrową, pomagać w księgowości, zarządzać kontaktami z klientem, weryfikować działania marketingowe, czy monitorować pracę magazynu.
                Dzieki ERP można otrzymać potrzebne informację za pomocą kilku kliknięć myszką, zamiast godzin w oczekiwaniu na raporty od pracowników.
                </p>
            </article>
            <aside>
                <picture >
                    <source className={classes.asideImg} media="(min-width: 0px)" srcSet={laptopImgMin} />
                    <source className={classes.asideImg} media="(min-width: 601px)" srcSet={laptopImgMiddle} />
                    <source className={classes.asideImg} media="(min-width: 1024px)" srcSet={laptopImgMax} />
                    <img className={classes.asideImg} src={laptopImgMax} alt="crm screen" />
                </picture>
            </aside>
        </section>
    );
};

