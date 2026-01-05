import { Helmet } from "react-helmet-async";

type PageTitleProps = {
    pageName:string
}
const PageTitle = ({pageName}:PageTitleProps) =>{
    return(
        <Helmet>
            <title>{import.meta.env.VITE_APP_NAME} | {pageName}</title>
        </Helmet>
    )
}

export default PageTitle;