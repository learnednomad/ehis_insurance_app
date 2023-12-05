package com.swe6623.ehismanagementsystem.security.config;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientForwardingController {

    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward(){
        return "forward:/";
    }
}
