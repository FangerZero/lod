import Head from 'next/head';

export default function Meta(props) {
    let genericTitle = 'Legend of Dragoon Community';
    if (props.title) {
        genericTitle = `${props.title} - ${genericTitle}`;
    }
        
    return (
        <Head>
            <title>{genericTitle}</title>
            <meta name="description" content={props.description} />
        </Head>
    )
}
