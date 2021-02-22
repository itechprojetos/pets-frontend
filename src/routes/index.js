import React, { /* useEffect */ useContext } from 'react'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import { Redirect, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { CommonActions } from '../store/actions/common'
import Loading from '../components/Loading'
import { Snackbar } from '@material/react-snackbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AuthenticationContext from '../contexts/Authentication/AuthenticationContext'
import LoaderContext from '../contexts/Loader/LoaderContext'
import Chat from '../components/Chat'

const Home = React.lazy(() => import('../pages/Home'))
const Shop = React.lazy(() => import('../pages/Shop'))
const Services = React.lazy(() => import('../pages/Services'))
const ProfessionalServices = React.lazy(() =>
  import('../pages/ProfessionalServices')
)
const SignUp = React.lazy(() => import('../pages/Auth/SignUp'))

const DetalhesServicos = React.lazy(() =>
  import('../pages/Shop/ServiceDetails')
)

// const { = React.lazy(() => import(} from "../store/actions/auth"));
const Donate = React.lazy(() => import('../pages/Profile/Donate'))
// const EditDonate = React.lazy(() =>
//   import('../pages/Profile/Donate/edit-donate')
// )
const LostFound = React.lazy(() => import('../pages/LostFound'))
const LostRegister = React.lazy(() => import('../pages/LostFound/LostRegister'))
const FoundRegister = React.lazy(() =>
  import('../pages/LostFound/FoundRegister')
)

const Profile = React.lazy(() => import('../pages/Profile'))
const AddMyPets = React.lazy(() => import('../pages/Profile/Pets'))
const ManagePets = React.lazy(() => import('../pages/Profile/ManagePets'))
const ManageServices = React.lazy(() =>
  import('../pages/Profile/ManageServices')
)
const ManageServicesEdit = React.lazy(() =>
  import('../pages/Profile/ManageServices/ManageServicesEdit')
)
const ManageServicesEditForm = React.lazy(() =>
  import('../pages/Profile/ManageServices/ManageServicesEditForm')
)
const Search = React.lazy(() => import('../pages/Search'))
const MyCard = React.lazy(() =>
  import('../pages/Profile/ManageServices/Cards/ManageServicesMyCard')
)
const MyCardForm = React.lazy(() =>
  import('../pages/Profile/ManageServices/Cards/ManageServicesMyCardForm')
)
const MyCardEdit = React.lazy(() =>
  import('../pages/Profile/ManageServices/Cards/ManageServicesMyCardEdit')
)

const WhoWeAre = React.lazy(() => import('../pages/Docs/WhoWeAre'))
const PrivacyPolicy = React.lazy(() => import('../pages/Docs/PrivacyPolicy'))
const TermsOfUse = React.lazy(() => import('../pages/Docs/TermsOfUse'))
const BePartner = React.lazy(() => import('../pages/Docs/BePartner'))

const Adopt = React.lazy(() => import('../pages/Adopt'))
// const Pet = React.lazy(() => import('../pages/Pet'));

// Blog routes
const Blog = React.lazy(() => import('../pages/blog'))
const BlogPostsEditar = React.lazy(() => import('../pages/blogPostsEditar'))
const BlogPostsAdicionar = React.lazy(() =>
  import('../pages/blogPostsAdicionar')
)
const BlogView = React.lazy(() => import('../pages/blogPostView'))

// Loja do Prestador - resultado produto fornecedor
const ResultadoProdutoFornecedor = React.lazy(() =>
  import('../pages/resultProdutFornecedor')
)

// Pet para adocao
const PetParaAdocao = React.lazy(() => import('../pages/PetParaAdocao'))
const PerdiUmPet = React.lazy(() => import('../pages/PerdiUmPet'))
const EncontreiUmPet = React.lazy(() => import('../pages/EncontreiUmPet'))

const ServiceSearch = React.lazy(() => import('../pages/ServiceSearch'))

// Racas
const TodasAsRacas = React.lazy(() => import('../pages/TodasAsRacas'))
const BreedDetail = React.lazy(() => import('../pages/BreedDetail'))

const Favorites = React.lazy(() => import('../pages/Favorites'))

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirect,
  ...rest
}) => {
  const res = redirect !== undefined ? redirect : '/'
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: res
              // state: { from: props.location }
            }}
          />
        )}
    />
  )
}

const PrivateRouteBlog = ({
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => {
  const dados = user === undefined ? 0 : user.customerTypeId

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && dados === 7 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/'
              // state: { from: props.location }
            }}
          />
        )}
    />
  )
}

const RedirectRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/'
            // state: { from: props.location }
          }}
        />
      )}
    />
  )
}

const Routes = ({
  loading,
  snackbar,
  snackbarMessage,
  // custumer,
  // userSigned,
  hideSnackbar
}) => {
  const { loading: authLoading, userSigned, customer, systemSigned, systemLoading } = useContext(
    AuthenticationContext
  )

  const { loading: loaderLoading } = useContext(LoaderContext)

  const isLoading = authLoading || loading || loaderLoading || systemLoading

  if (systemLoading || authLoading) {
    return <Loading loading bgColor='white' initialOpacity={1} />
  }

  return (
    <ConnectedRouter history={history} base>
      <Loading loading={isLoading} />
      <div className='wrapper'>
        <React.Suspense fallback={<Loading loading />}>
          <div className='content'>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search' component={Search} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/services/:description' component={ServiceSearch} />
              <Route path='/services' component={Services} />
              <Route path='/store' component={ProfessionalServices} />
              <Route path='/lost-found' exact component={LostFound} />
              <Route path='/lost-found/lost' component={LostRegister} />
              <Route path='/lost-found/found' component={FoundRegister} />
              <Route path='/docs/who-we-are' exact component={WhoWeAre} />
              <Route
                path='/docs/privacy-policy'
                exact
                component={PrivacyPolicy}
              />
              <Route path='/favorites' component={Favorites} />
              <Route path='/docs/terms' exact component={TermsOfUse} />
              <Route path='/docs/be-a-partner' exact component={BePartner} />
              <Route path='/adopt' component={Adopt} />

              <Route exact path='/blog' component={Blog} />
              <Route path='/blog/posts/:post' component={BlogView} />

              <Route path='/racas/:animals' component={TodasAsRacas} />
              <Route path='/breeds/:name' component={BreedDetail} />

              <PrivateRoute
                path='/perdi/pet'
                isAuthenticated={userSigned}
                component={PerdiUmPet}
                redirect='/sign-up'
              />

              <PrivateRoute
                path='/perdi/pet'
                isAuthenticated={userSigned}
                component={PerdiUmPet}
                redirect='/sign-up'
              />

              <PrivateRoute
                path='/encontrei/pet'
                isAuthenticated={userSigned}
                component={EncontreiUmPet}
                redirect='/sign-up'
              />

              <PrivateRouteBlog
                path='/blog/admin/:slug'
                user={customer}
                isAuthenticated={userSigned}
                component={BlogPostsEditar}
              />

              <PrivateRouteBlog
                path='/blog/new/post'
                user={customer}
                isAuthenticated={userSigned}
                component={BlogPostsAdicionar}
              />

              <Route
                path='/products/:id'
                component={ResultadoProdutoFornecedor}
              />
              <Route
                path='/professionals/:id/services'
                exact
                component={Shop}
              />
              <Route path='/donations/:id' component={PetParaAdocao} />
              <Route
                path='/professionals/:id/services/:serviceId'
                component={DetalhesServicos}
              />

              <PrivateRoute
                path='/profile/manage-services/edit/form'
                isAuthenticated={userSigned}
                component={ManageServicesEditForm}
              />
              <PrivateRoute
                path='/profile/manage-services/edit'
                isAuthenticated={userSigned}
                component={ManageServicesEdit}
              />
              <PrivateRoute
                path='/profile/manage-services'
                isAuthenticated={userSigned}
                component={ManageServices}
              />

              <PrivateRoute
                path='/profile/my-card/form'
                isAuthenticated={userSigned}
                component={MyCardForm}
              />

              <PrivateRoute
                path='/profile/my-card/form-edit'
                isAuthenticated={userSigned}
                component={MyCardEdit}
              />

              <PrivateRoute
                path='/profile/my-card'
                isAuthenticated={userSigned}
                component={MyCard}
              />

              <PrivateRoute
                path='/profile/manage-pets'
                isAuthenticated={userSigned}
                component={ManagePets}
              />
              <PrivateRoute
                path='/profile/add-my-pet'
                isAuthenticated={userSigned}
                component={AddMyPets}
              />
              <PrivateRoute
                path='/profile/edit-my-pet/:id'
                isAuthenticated={userSigned}
                component={AddMyPets}
              />
              <PrivateRoute
                path='/profile/donate'
                isAuthenticated={userSigned}
                component={Donate}
              />
              <PrivateRoute
                path='/profile/edit-donate/:id'
                isAuthenticated={userSigned}
                component={Donate}
              />
              <PrivateRoute
                path='/profile'
                isAuthenticated={userSigned}
                component={Profile}
              />
              <RedirectRoute path='*' />
            </Switch>
            <Footer />
            <Chat />
          </div>
        </React.Suspense>
      </div>
      <Snackbar
        message={snackbarMessage}
        open={snackbar}
        onClose={() => {
          hideSnackbar()
        }}
      />
    </ConnectedRouter>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.common.commonStatus.loading,
    snackbar: state.common.commonStatus.snackbar,
    snackbarMessage: state.common.commonStatus.snackbarMessage,
    userSigned: state.customer.customerStatus.userSigned,
    custumer: state.customer.customerStatus.customer
  }
}

const mapDispatchToPros = dispatch =>
  bindActionCreators({ ...CommonActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToPros)(Routes)
