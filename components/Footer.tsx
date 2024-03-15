import { FacebookIcon } from './icons/FacebookIcon'
import { LogoIcon } from './icons/LogoIcon'
import { TwitterIcon } from './icons/TwitterIcon'
import { YoutubeIcon } from './icons/YoutubeIcon'

export default function Footer() {
  return (
    <footer className="px-2.5 py-4 bg-base-200 text-base-content">
      <div className="footer max-w-screen-xl mx-auto">
        <nav>
          <h4 className="footer-title">Informações</h4>
          <a
            href="/"
            className="link link-hover"
            aria-label="politica de reembolso"
          >
            Política de Reembolso
          </a>
          <a
            href="/"
            className="link link-hover"
            aria-label="politica de entrega e envio
          "
          >
            Política de Entrega e Envio
          </a>
          <a
            href="/"
            className="link link-hover"
            aria-label="politica de trocas e devolução"
          >
            Política de Trocas e Devoluções
          </a>
          <a
            href="/"
            className="link link-hover"
            aria-label="politica de privacidade"
          >
            Política de privacidade
          </a>
          <a href="/" className="link link-hover" aria-label="termos de uso">
            Termos de uso
          </a>
        </nav>
        <nav>
          <h4 className="footer-title">Fale conosco</h4>
          <a
            href="/"
            className="link link-hover"
            aria-label="telefone para atendimento ao cliente"
          >
            (00)0000-0000 para Atendimento ao Cliente
          </a>
          <a
            href="/"
            className="link link-hover"
            aria-label="email para atendimento do cliente"
          >
            teste@loja.com.br
          </a>
        </nav>
        <form>
          <h4 className="footer-title">Receba nossas Ofertas e Novidades</h4>
          <fieldset className="form-control w-80">
            <div className="join">
              <input
                type="text"
                placeholder="Digite seu e-mail aqui"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">ASSINAR</button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="footer items-center max-w-screen-xl mx-auto pt-10">
        <aside className="items-center grid-flow-col">
          <LogoIcon width={36} height={36} />
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="/" aria-label="twitter da loja">
            <TwitterIcon />
          </a>
          <a href="/" aria-label="youtube da loja">
            <YoutubeIcon />
          </a>
          <a href="/" aria-label="facebook da loja">
            <FacebookIcon />
          </a>
        </nav>
      </div>
    </footer>
  )
}
