<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arq/index.html">
            <html>
                <head>
                    <title>Arqueossítios</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1>Arqueossítios</h1>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>   
                </body>
            </html>
        </xsl:result-document> 
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="arqelem-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="arq/arqelem-{generate-id()}.html">
            <html>
                <head>
                    <title>Arqueossítios</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1>Arqueossítios</h1>
                    <table>
                        <tr>
                            <th>Indentificação:</th><td><xsl:value-of select="IDENTI"/></td>
                        </tr>        
                    </table>
                    <hr/>
                    <address>
                        <a href="index.html">Índice</a>
                    </address>
                </body>
            </html>
        </xsl:result-document>  
    </xsl:template>
    
</xsl:stylesheet>