import s from './Root.module.scss'

export type TRootProps = {
    headers: React.ReactNode,
    filter: React.ReactNode,
    table: React.ReactNode,
    title: React.ReactNode,
}

export const Root: React.FC<TRootProps> = ({ headers, filter, table, title }) => {
    return (
        <div className={s.root}>
            <h1>{title}</h1>
            <div className={s.root_header} >
                {headers}
                {filter}
                {table}
            </div>
        </div>
    )
}