import RegisterForm from '@/components/shop/register/RegisterForm'

const RegisterPage = async () => {
  //   const page = props?.searchParams?.page ?? 1
  //   const { totalDocs, categories } = await get(`api/categories`, {
  //     page,
  //     size: LIMIT_PAGE_NUMBER,
  //   }, ['categories'])
  return (
    <>
      {/* <DashboardTitle pageName='danh mục' totalDocs={totalDocs} /> */}
      <RegisterForm />
    </>
  )
}

export default RegisterPage
