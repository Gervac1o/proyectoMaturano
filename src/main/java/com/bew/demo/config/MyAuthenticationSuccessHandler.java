package com.bew.demo.config;

import com.bew.demo.model.Usuario;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        Usuario usuario = (Usuario) authentication.getPrincipal();

        Cookie cIdUsuario = new Cookie("idUsuario", usuario.getIdUsuario().toString());
        cIdUsuario.setMaxAge(60*60*24*31);
        cIdUsuario.setPath("/");
        cIdUsuario.setSecure(false);
        httpServletResponse.addCookie(cIdUsuario);
        Cookie cMail = new Cookie("email", usuario.getEmail());
        cMail.setMaxAge(60*60*24*31);
        cMail.setPath("/");
        cMail.setSecure(false);
        httpServletResponse.addCookie(cMail);
        Cookie cTipoUsuario = new Cookie("tipoUsuario", usuario.getTipoUsuario().toString());
        cTipoUsuario.setMaxAge(60*60*24*31);
        cTipoUsuario.setPath("/");
        cTipoUsuario.setSecure(false);
        httpServletResponse.addCookie(cTipoUsuario);

        httpServletResponse.sendRedirect("/");
    }
}
