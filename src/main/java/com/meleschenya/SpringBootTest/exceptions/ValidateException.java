package com.meleschenya.SpringBootTest.exceptions;

public class ValidateException extends Exception {

    private String message;

    public ValidateException(String message){

    }

    public String getMessage(){
        return message;
    }

}
