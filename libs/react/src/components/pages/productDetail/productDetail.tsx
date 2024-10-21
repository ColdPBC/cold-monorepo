import {MainContent} from "@coldpbc/components";

export const ProductDetail = () => {
  return (
    <MainContent
      title="Product Detail"
      breadcrumbs={[
        { label: 'Products', href: '/products' },
        { label: 'Product Detail' },
      ]}
    >
    </MainContent>
  )
}
