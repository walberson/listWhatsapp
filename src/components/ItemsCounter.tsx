export function ItemsCounter ({total}: {total: number}){
    return(
        <span style={{ fontSize: 30 }}>
          Total de itens: {total}
          <br />
        </span>
    )
}