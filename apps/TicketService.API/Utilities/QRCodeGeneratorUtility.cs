namespace TicketService.API.Utilities
{
    using QRCoder;

    public class QrCodeGeneratorUtility
    {
        public string GenerateQrContent()
        {
            return Guid.NewGuid().ToString();
        }

        public string GenerateQrCode(string content)
        {
            using (var qrGenerator = new QRCodeGenerator())
            using (var qrCodeData = qrGenerator.CreateQrCode(content, QRCodeGenerator.ECCLevel.Q))
            using (var qrCode = new PngByteQRCode(qrCodeData))
            {
                byte[] qrCodeImage = qrCode.GetGraphic(20);
                return Convert.ToBase64String(qrCodeImage);
            }
        }
    }
}