import LoginForm from '@/components/shop/login/LoginForm'

const LoginPage = async () => {
  //   const page = props?.searchParams?.page ?? 1
  //   const { totalDocs, categories } = await get(`api/categories`, {
  //     page,
  //     size: LIMIT_PAGE_NUMBER,
  //   }, ['categories'])
  return (
    <>
      {/* <DashboardTitle pageName='danh mục' totalDocs={totalDocs} /> */}
      <LoginForm />
    </>
  )
}

export default LoginPage
