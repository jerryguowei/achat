package com.duduanan.achat.jackson;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class NullStringSerializer extends JsonSerializer<String>
{
   public void serialize(String value, JsonGenerator jgen, SerializerProvider provider)
       throws IOException, JsonProcessingException
   {
	   if(value == null) value = "";
	   jgen.writeString(value);
   }
}