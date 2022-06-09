<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- Init -->
<xsl:template match="/">
<html>
  <body>
    <xsl:call-template name="iterate"/>
  </body>
</html>
</xsl:template>

<!-- Iterate -->
<xsl:template name="iterate">
  <xsl:for-each select="./*">
    <xsl:call-template name="type"/>
  </xsl:for-each>
</xsl:template>

<xsl:template name="type">
  <xsl:choose>
    <xsl:when test="@type='number'">
      <p>
        <xsl:value-of select="."></xsl:value-of>
      </p>
    </xsl:when>
    <xsl:otherwise>
      <xsl:call-template name="iterate"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

</xsl:stylesheet>
